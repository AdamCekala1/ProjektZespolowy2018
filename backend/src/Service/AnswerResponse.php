<?php declare(strict_types=1);

namespace App\Service;


class AnswerResponse
{
    private $answerId;
    private $sum = 1;

    public function getAnswerId(): int
    {
        return $this->answerId;
    }

    public function setAnswerId($answerId): self
    {
        $this->answerId = $answerId;
        return $this;
    }

    public function getSum(): int
    {
        return $this->sum;
    }

    public function setSum($sum): self
    {
        $this->sum = $sum;
        return $this;
    }

    public function incrementSum(): void
    {
        $this->sum = $this->sum + 1;
    }
}