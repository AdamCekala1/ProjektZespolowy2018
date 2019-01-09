<?php declare(strict_types=1);

namespace App\Service;

class SendResponse
{
    private $questionId;
    private $answers;

    public function getQuestionId(): int
    {
        return $this->questionId;
    }

    public function setQuestionId($questionId): self
    {
        $this->questionId = $questionId;
        return $this;
    }

    public function getAnswers(): array
    {
        return $this->answers;
    }

    public function addAnswers(int $answerResponse): self
    {
        if(isset($this->answers[$answerResponse])) {
            $this->answers[$answerResponse]->incrementSum();
            return $this;
        }
        $this->answers[$answerResponse] = (new AnswerResponse())
            ->setAnswerId($answerResponse);
        return $this;
    }
}
