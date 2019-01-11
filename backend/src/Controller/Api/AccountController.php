<?php declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\EntityBase;
use App\Entity\User;
use App\Form\Register;
use App\Repository\QuestionnaireRepository;
use App\Repository\UserRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;

class AccountController extends BaseController
{
    /**
     * @Route("account/security/token", name="get_token" )
     * @Method("POST")
     */
    public function getToken(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $user = $this->getDoctrine()->getRepository(User::class)->findOneBy([
            'email' => $data['login'],
        ]);
        if (!$user) {
            throw $this->createNotFoundException('Nie ma takiego użytkownika');
        }
        $isValid = $this->passwordEncoder->isPasswordValid($user, $data['password']);
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
        $this->processForm($request, Register::class, new User());

        return new JsonResponse(['message' => 'Konto zostało założone pomyślnie'], 201);
    }

    /**
     * @Route("api/account/about", name="about" )
     * @Method("GET, PUT")
     */
    public function getDataUser(Request $request): Response
    {
        $user = $this->getUserEntity($request);

        if ($request->getMethod() == 'PUT') {
            return $this->processForm($request, Register::class, $user);
        }
        return new Response($this->serial->serialize($user, 'json'));
    }

    protected function getTransaction(EntityBase $entityBase, string $form): EntityBase
    {
        switch ($form) {
            case Register::class:
                return $this->registerTransaction($entityBase);
            default:
                throw new \Exception('Nie ma takiej transakcji');
        }
    }

    private function registerTransaction(User $user): EntityBase
    {
        $user
            ->setPassword($this->passwordEncoder->encodePassword($user, $this->decodedData['password']));
        return $user;
    }

    /**
     * @Route("api/admin/account/list", name="list_users" )
     * @Method("GET") // TODO dodac do dokumentacji
     * @IsGranted("ROLE_ADMIN", message="Musisz być adminem" , statusCode=401)
     */
    public function getListUsers(UserRepository $userRepository)
    {
        $users = [];
        foreach ($userRepository->findAll() as $user) {
            $user->clearResponse();
            $user->clearQuestionnaire();
            $users[] = $user;
        }
        return new Response($this->serial->serialize($users, 'json'));
    }

    /**
     * @Route("api/admin/accept/{questionnaire}", name="questionnaire_accept" )
     * @Method("POST") // TODO dodac
     * @IsGranted("ROLE_ADMIN", message="Musisz być adminem" , statusCode=401)
     */
    public function acceptQuestionnaire(int $questionnaire, QuestionnaireRepository $questionnaireRepository)
    {
        try {
            $entity = $questionnaireRepository->find($questionnaire);
            $entity->setAccept(true);
            $this->entityManager->persist($entity);
            $this->entityManager->flush();

        } catch (\Throwable $exception) {
            return new JsonResponse(['message' =>'Wystąpiły turbulencje z zapisem']);
        }
        return new JsonResponse(['message' =>'Zaakcpetowanie ankiety powiodło się']);
    }

    /**
     * @Route("api/admin/questionnaire/list-all", name="questionnaire_list_all_admin" )
     * @Method("GET") // TODO dla admina do zaacpektowania
     * @IsGranted("ROLE_ADMIN", message="Musisz być adminem" , statusCode=401)
     */
    public function listAllQuestionnaire(QuestionnaireRepository $questionnaireRepository)
    {
        $array = [];
        foreach ($questionnaireRepository->findAll() as $questionnaire) {
            $questionnaire->clearOwner();
            $array[] = $questionnaire;
        }
        return new Response($this->serial->serialize($array, 'json'));
    }
}
