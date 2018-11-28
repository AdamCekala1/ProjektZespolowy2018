<?php declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\EntityBase;
use App\Entity\User;
use App\Form\Register;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Symfony\Component\Serializer\SerializerInterface;

class AccountController extends AbstractController
{
    private $passwordEncoder;
    private $JWTEncoder;
    private $serializer;
    private $entityManager;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder, JWTEncoderInterface $JWTEncoder, SerializerInterface $serializer, EntityManagerInterface $entityManager)
    {
        $this->passwordEncoder = $passwordEncoder;
        $this->JWTEncoder = $JWTEncoder;
        $this->serializer = $serializer;
        $this->entityManager = $entityManager;
    }

    /**
     * @Route("account/security/token", name="get_token" )
     * @Method("POST")
     */
    public function getToken(Request $request)
    {
        $user = $this->getDoctrine()->getRepository(User::class)->findOneBy([
            'email' => $request->getUser(),
        ]);
        if (!$user) {
            throw $this->createNotFoundException('Nie ma takiego użytkownika');
        }
        $isValid = $this->passwordEncoder->isPasswordValid($user, $request->getPassword());
        if (!$isValid) {
            throw new BadCredentialsException('Podano złe hasło');
        }
        $token = $this->JWTEncoder->encode(['username' => $user->getUsername()]);

        return new JsonResponse([
            'token' => $token
        ]);
    }

    /**
     * @Route("account/security/register", name="register" )
     * @Method("POST")
     */
    public function register(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $user = new User();
        $form = $this->createForm(Register::class, $user);
        $form->submit($data);
        $user->setPassword($this->passwordEncoder->encodePassword($user, $data['password']));
        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();
        return new Response('Konto zostało założone pomyślnie', 201);
    }

    /**
     * @Route("api/account/about/{user}", name="about" )
     * @Method("GET, PUT")
     */
    public function getDataUser(User $user, Request $request): Response
    {
        if ($request->getMethod() == 'PUT') {
          return $this->processForm($request, Register::class, $user);
        }

        return new Response($this->serializer->serialize($user, 'json'));
    }

    protected function getUserName(Request $request): string
    {
        $token = str_replace('Bearer ', '', $request->headers->get('Authorization'));
        return $this->JWTEncoder->decode($token)['username'];
    }

    protected function checkPermission(Request $request, int $id): bool
    {
        $userName = $this->getUserName($request);
        $entity = $this->getDoctrine()->getRepository(User::class)->findOneBy(['email' => $userName]);
        return $entity->getId() == $id;
    }

    protected function processForm(Request $request, string $form, EntityBase $entity): Response
    {
        if(!$this->checkPermission($request,$entity->getId())) return new Response('Nie można edytować cudzego konta');

        $this->entityManager->beginTransaction();
        try{
            $decodedData = json_decode($request->getContent(), true);
            $form = $this->createForm($form, $entity);
            $form->submit($decodedData);
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();
            $this->entityManager->commit();
        }catch ( \Throwable $exception) {
            $this->entityManager->rollback();
            return new JsonResponse('Nie udało się zapisać danych');
        }
        return new Response('Dane zmodyfikowano pomyślnie', 201);
    }
}
