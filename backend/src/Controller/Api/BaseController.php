<?php declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\EntityBase;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Serializer\SerializerInterface;

abstract class BaseController extends AbstractController
{
    protected $JWTEncoder;
    protected $serializer;
    protected $entityManager;
    protected $decodedData;
    protected $passwordEncoder;

    public function __construct(JWTEncoderInterface $JWTEncoder, SerializerInterface $serializer, EntityManagerInterface $entityManager, UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->JWTEncoder = $JWTEncoder;
        $this->serializer = $serializer;
        $this->entityManager = $entityManager;
        $this->passwordEncoder = $passwordEncoder;
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

        //$entity->getId() !== $id ?:return new Response('Nie można edytować cudzego konta');;
    }

    final protected function processForm(Request $request, string $formClass, EntityBase $entity): Response
    {
        //if (!$entity->getId()) $this->checkPermission($request, $entity->getId());

        $this->entityManager->beginTransaction();
        try {
            $this->decodedData = json_decode($request->getContent(), true);
            $form = $this->createForm($formClass, $entity);
            $form->submit($this->decodedData);
            $this->entityManager->persist($this->getTransaction($entity, $formClass));
            $this->entityManager->flush();
            $this->entityManager->commit();
        } catch (\Throwable $exception) {
            $this->entityManager->rollback();
            return new JsonResponse('Nie udało się zapisać danych');
        }
        return new Response('Dane zmodyfikowano pomyślnie', 201);
    }

    abstract protected function getTransaction(EntityBase $entityBase, string $form): EntityBase;
}