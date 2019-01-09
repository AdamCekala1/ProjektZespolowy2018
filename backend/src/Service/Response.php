<?php declare(strict_types=1);


namespace App\Service;

use JMS\Serializer\Annotation as Serializer;

class Response
{
    /**
     * @Serializer\Type("int")
     */
    private $answerId;
    /**
     * @Serializer\Type("int")
     */
    private $questionId;

    public function getAnswerId(): int
    {
        return $this->answerId;
    }

    public function setAnswerId($answerId): self
    {
        $this->answerId = $answerId;
        return $this;
    }

    public function getQuestionId(): int
    {
        return $this->questionId;
    }

    public function setQuestionId($questionId): self
    {
        $this->questionId = $questionId;
        return $this;
    }
}