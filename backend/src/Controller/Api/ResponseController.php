<?php declare(strict_types=1);


namespace App\Controller\Api;

use App\Entity\Answer;
use App\Entity\Category;
use App\Entity\Question;
use App\Entity\Response as Entity;
use App\Service\Response;
use App\Service\SendResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\EntityBase;

class ResponseController extends BaseController
{
    /**
     * @Route("response/add", name="response_add" )
     * @Method("POST")
     */
    public function addResponse(Request $request)
    {
        $responses = $this->serial->deserialize($request->getContent(), 'array<' . Response::class . '>', 'json');
        try {
            foreach ($responses as $respons) {
                /** @var Response $respons */
                $entity = new Entity();
                $entity
                    ->setQuestion($this->getQuestion($respons->getQuestionId()))
                    ->setAnswer($this->getAnswer($respons->getAnswerId()));
                $this->entityManager->persist($entity);
                $this->entityManager->flush();
            }
        } catch (\Throwable $exception) {
            return new JsonResponse(['message' => $exception->getMessage()]);
        }
        return new JsonResponse(['message' =>'Dziekuję za odpowiedz']);
    }

    /**
     * @Route("response/get/{questionnaire}", name="response_get" )
     * @Method("GET")
     */
    public function getResponse(int $questionnaire)
    {
       $result = $this->sumResponses($this->getResponses($questionnaire));
       return new \Symfony\Component\HttpFoundation\Response($this->serial->serialize($result,'json'));
    }

    /**
     * @Route("api/category/add", name="category_new")
     * @Method("POST")
     * @IsGranted("ROLE_ADMIN", message="Musisz być adminem" , statusCode=401)
     */
    public function newCategory(Request $request)
    {
        try{
            $category = $this->serial->deserialize($request->getContent(), Category::class, 'json');
            $this->entityManager->persist($category);
            $this->entityManager->flush();
        }catch (\Throwable $exception)
        {
            return new JsonResponse(['message' => $exception->getMessage()]);
        }

        return new JsonResponse(['message' =>'Udalo się dodać kategorie']);
    }

    /**
     * @Route("api/category/edit/{category}", name="category_edit")
     * @Method("POST,DELETE")
     * @IsGranted("ROLE_ADMIN", message="Musisz być adminem" , statusCode=401)
     */
    public function editCategory(Request $request, int $category)
    {
        try{
            $categoryNew = $this->serial->deserialize($request->getContent(), Category::class, 'json');
            $category = $this->entityManager->getRepository(Category::class)->find($category);
            if($request->getMethod() == "DELETE")
            {
                $this->entityManager->remove($category);
                $this->entityManager->flush();
                return new JsonResponse(['message' => 'Udało się usunąć kategorie']);
            }
            $category->setName($categoryNew->getName());
            $this->entityManager->persist($category);
            $this->entityManager->flush();
        }catch (\Throwable $exception)
        {
            return new JsonResponse(['message' => $exception->getMessage()]);
        }

        return new JsonResponse(['message' =>'Udalo się edytować kategorie']);
    }
    /**
     * @Route("api/category/get", name="category_get")
     * @Method("GET")
     * @IsGranted("ROLE_ADMIN", message="Musisz być adminem" , statusCode=401)
     */
    public function getCategory()
    {
       $categories = $this->entityManager->getRepository(Category::class)->findAll();

        return new \Symfony\Component\HttpFoundation\Response($this->serial->serialize($categories, 'json'));
    }

    private function getAnswer(int $id): Answer
    {
        return $this->entityManager->getRepository(Answer::class)->find($id);
    }

    private function getQuestion(int $id): Question
    {
        return $this->entityManager->getRepository(Question::class)->find($id);
    }

    private function getResponses(int $questionnaire): array
    {
        $array = [];
        $responses = $this->entityManager->getRepository(Entity::class)->findByQuestionnaire($questionnaire);
        foreach ($responses as $response) {
            $array[] = (new Response())
                ->setQuestionId($response->getQuestion()->getId())
                ->setAnswerId($response->getAnswer()->getId());
        }
        return $array;
    }

    private function sumResponses(array $responses): array
    {
        $array = [];
        /** @var Response $response */
        foreach ($responses as $response)
        {
            if(isset($array[$response->getQuestionId()])) {
                $array[$response->getQuestionId()]->addAnswers($response->getAnswerId());
            }else $array[$response->getQuestionId()] = (new SendResponse())
                ->setQuestionId($response->getQuestionId())
                ->addAnswers($response->getAnswerId());
        }
        return $array;
    }

    protected function getTransaction(EntityBase $entityBase, string $form): EntityBase
    {
        // TODO: Implement getTransaction() method.
    }
}