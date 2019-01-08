<?php

namespace App\Entity;


interface Editable
{
    public function getQuestionnaire(): Questionnaire;
}