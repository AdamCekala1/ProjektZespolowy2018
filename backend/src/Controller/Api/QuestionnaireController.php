<?php declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\Answer;
use App\Entity\EntityBase;
use App\Entity\Question;
use App\Entity\Questionnaire as Entity;
use App\Entity\Questionnaire;
use App\Form\Questionnaire as Form;
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
        $questionnaire = $this->serial->deserialize($request->getContent(), Questionnaire::class, 'json');
        foreach($questionnaire->getQuestion() as $item)
        {
            $item->setQuestionnaire($questionnaire);
            foreach($item->getAnswers() as $answer)
            {
                $answer->setQuestion($item);
            }
        }
        $this->entityManager->persist($questionnaire);
        $this->entityManager->flush();
        return new JsonResponse('Udalo się dodać ankietę');
    }

    /**
     * @Route("api/questionnaire/edit/{quesionnaire}", name="questionnaire_edit")
     * @Method("POST, GET")
     */
    public function editQuestionnaire(int $quesionnaire, Request $request): Response
    {
        return new Response('udalo sie edytowac');
    }

    /**
     * @Route("api/questionnaire/list", name="questionnaire_edit")
     * @Method("GET, POST")
     */
    public function listQuestionnaire(Request $request): Response
    {
        if($request->getMethod() == 'POST')
        {
            $data = json_decode($request->getContent(), true);
            $collection = $this->entityManager->getRepository(Questionnaire::class)->findByDate($data['start'], $data['end']);
        }
        else $collection = $this->entityManager->getRepository(Questionnaire::class)->findAll();
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
