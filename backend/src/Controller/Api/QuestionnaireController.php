<?php declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\Answer;
use App\Entity\EntityBase;
use App\Entity\Question;
use App\Entity\Questionnaire as Entity;
use App\Form\Questionnaire as Form;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
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
        $x = ['Najbardziej popularne owoce w Polsce' => [
            'Jakie owoce lubisz najbardziej' => ['truskawki', 'Pomarańcze', 'Pomidory'],
            'Jak czesto jesz owocce' => ['czesto', 'rzadko', 'wcale', 'wole slodycze'],
            'Gdzie kupujesz owoce' => ['w osiedlowym sklepie', 'biedronce', 'wcale', 'wole slodycze'],
        ]];
        $y = json_encode($x);

        return $this->processForm($request, Form::class, new Entity());
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
        $y = $questionnaire;
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
    }

    private function addNewAnswer(string $content): Answer
    {
        return (new Answer())
            ->setContent($content);
    }
}
