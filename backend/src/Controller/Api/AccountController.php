<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Form\Register;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;

class AccountController extends AbstractController
{
    private $passwordEncoder;
    private $JWTEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder , JWTEncoderInterface $JWTEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
        $this->JWTEncoder = $JWTEncoder;
    }

    /**
     * @Route("account/security/token", name="get_token" )
     * @Method("POST")
     */
    public function getToken(Request $request)
    {
        $user = $this->getDoctrine()->getRepository(User::class)->findOneBy([
            'email' =>  $request->getUser(),
        ]);
        if(!$user){
            throw $this->createNotFoundException('Nie ma takiego użytkownika');
        }
        $isValid = $this->passwordEncoder->isPasswordValid($user, $request->getPassword());
        if(!$isValid){
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
        $user->setPassword($this->passwordEncoder->encodePassword($user,$data['password']));
        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();
        return new Response('Konto zostało założone pomyślnie', 201);
    }

    /**
     * @Route("api/account/about", name="about" )
     * @Method("GET")
     */
    public function getDataUser(): Response
    {
        return new JsonResponse();
    }
}
