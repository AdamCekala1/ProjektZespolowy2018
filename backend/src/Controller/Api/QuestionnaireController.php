<?php declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\Answer;
use App\Entity\EntityBase;
use App\Entity\Question;
use App\Entity\Questionnaire as Entity;
use App\Entity\Questionnaire;
use App\Form\Questionnaire as Form;
use App\Service\EditQuestionnaire;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class QuestionnaireController extends BaseController
{
    /**
     * @Route("api/questionnaire/add", name="questionnaire_new")
     * @Method("POST")
     */
    public function newQuestionnaire(Request $request): Response
    {
        try{
            $questionnaire = $this->serial->deserialize($request->getContent(), Questionnaire::class, 'json');
            foreach($questionnaire->getQuestion() as $item)
            {
                $item->setQuestionnaire($questionnaire);
                foreach($item->getAnswers() as $answer)
                {
                    $answer->setQuestion($item);
                }
            }
            $questionnaire
                ->setOwner($this->getUserEntity($request))
                ->setAccept(false);
            $this->entityManager->persist($questionnaire);
            $this->entityManager->flush();
        }catch (\Throwable $exception)
        {
            return new JsonResponse(['message' => $exception->getMessage()]);
        }

        return new JsonResponse(['message' =>'Udalo się dodać ankietę']);
    }

    /**
     * @Route("api/questionnaire/edit", name="questionnaire_edit")
     * @Method("GET")
     */
    public function editQuestionnaire(Request $request): Response
    {
        try{
            foreach(json_decode($request->getContent() ,true) as $item){
                $entity = $this->entityManager->getRepository(EditQuestionnaire::ITEM_TYPE[$item['item']])->find($item['id']);
                if($entity->getQuestionnaire()->getOwner() !== $this->getUserEntity($request)) return new JsonResponse('Nie można edytować cudzej ankiety');
                if(!$item['item']) $entity->setTitle($item['change']);
                else $entity->setContent($item['change']);
                $this->entityManager->persist($entity);
                $this->entityManager->flush();
            }
        }catch (\Throwable $exception)
        {
            return new JsonResponse(['message' => $exception->getMessage()]);
        }
        return new JsonResponse(['message' =>'Edytowanie przebiegło pomyślnie']);
    }

    /**
     * @Route("api/questionnaire/list-user", name="questionnaire_list_all")
     * @Method("GET") // TODO dla usera - dodano
     */
    public function userListQuestionnaire(Request $request): Response
    {
        $collection = $this->entityManager->getRepository(Questionnaire::class)->findBy(['owner' => $this->getUserEntity($request)->getId(), 'accept' => true]);
        return new Response($this->serial->serialize($collection, 'json'));
    }

    /**
     * @Route("questionnaire/list-all", name="questionnaire_list")
     * @Method("GET") // TODO na strone głowna - dodano
     */
    public function listQuestionnaire(Request $request): Response
    {
        if($request->getMethod() == 'POST')
        {
            $data = json_decode($request->getContent(), true);
            $collection = $this->entityManager->getRepository(Questionnaire::class)->findByDate($data['start'], $data['end']);
            return new Response($this->serial->serialize($collection, 'json'));
        }
        $collection = $this->entityManager->getRepository(Questionnaire::class)->findBy(['accept' => true]);
        return new Response($this->serial->serialize($collection, 'json'));
    }

    /**
     * @Route("api/questionnaire/{questionnaire}/delete", name="questionnaire_delete")
     * @Method("DELETE")
     */
    public function deleteQuestionnaire(Questionnaire $questionnaire, Request $request)
    {
        if($this->getUserEntity($request) !== $questionnaire->getOwner()) return new JsonResponse('Nie można usuwać cudzej ankiety');
        $this->entityManager->remove($questionnaire);
        $this->entityManager->flush();
        return new JsonResponse(['message' =>'Udało się usunąć ankiete']);
    }

    /**
     * @Route("questionnaire/{questionnaire}/get", name="questionnaire_get")
     * @Method("GET")
     */
    public function getQuestionnaire(int $questionnaire)
    {
        $collection = $this->entityManager->getRepository(Questionnaire::class)->find($questionnaire);
        if(!$collection) return new JsonResponse(['message' =>'Nie ma takiej ankiety']);
        $collection->dontShowOwner();
        return new Response($this->serial->serialize($collection, 'json'));
    }

    protected function getTransaction(EntityBase $entityBase, string $form): EntityBase
    {
        switch ($form) {
            case Form::class:
                return $this->newQuestionnaireTransaction($entityBase);
            default:
                throw new \Exception('Nie ma takiej transakcji');
        }
    }

    private function newQuestionnaireTransaction(Entity $questionnaire): Entity
    {
        $questionnaireTitle = key($this->decodedData);
        $questionnaire->setTitle($questionnaireTitle);
        foreach ($this->decodedData[$questionnaireTitle] as $title => $answer) {
            $questionnaire->addQuestion($this->addNewQuestion($title, $answer));
        }
        $this->entityManager->persist($questionnaire);
        return $questionnaire;
    }

    private function addNewQuestion(string $content, array $answers): Question
    {
        $question = new Question();
        $question->setContent($content);
        foreach ($answers as $answer) {
            $question->addAnswer($this->addNewAnswer($answer));
            $this->entityManager->persist($question);
        }
        return $question;
    }

    private function addNewAnswer(string $content): Answer
    {
        $answer = (new Answer())->setContent($content);
        $this->entityManager->persist($answer);
        return $answer;
    }
}
