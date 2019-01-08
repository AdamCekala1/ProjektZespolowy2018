<?php

namespace App\Service;


use App\Entity\Answer;
use App\Entity\Question;
use App\Entity\Questionnaire;
use Symfony\Component\HttpFoundation\Request;

class EditQuestionnaire
{
    public const ITEM_TYPE = [
        Questionnaire::class,
        Answer::class,
        Question::class,
    ];

    private $item;

    private $change;

    private $id;

    public function getItem(): int
    {
        return $this->item;
    }

    public function setItem(int $item): self
    {
        $this->item = $item;
        return $this;
    }

    public function getChange(): string
    {
        return $this->change;
    }

    public function setChange(string $change): self
    {
        $this->change = $change;
        return $this;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function setId(int $id): self
    {
        $this->id = $id;
        return $this;
    }

    public function mapRequest(Request $request)
    {

    }
}