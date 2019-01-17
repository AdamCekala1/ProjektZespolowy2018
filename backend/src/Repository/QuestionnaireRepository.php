<?php

namespace App\Repository;

use App\Entity\Category;
use App\Entity\Questionnaire;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Questionnaire|null find($id, $lockMode = null, $lockVersion = null)
 * @method Questionnaire|null findOneBy(array $criteria, array $orderBy = null)
 * @method Questionnaire[]    findAll()
 * @method Questionnaire[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class QuestionnaireRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Questionnaire::class);
    }

    /**
     * @return Questionnaire[] Returns an array of Questionnaire objects
     */

    public function findByDate(string $start, string $end, Category $category)
    {
        $starter = new \DateTime($start);
        $ending = new \DateTime($end);
        return $this->createQueryBuilder('q')
            ->andWhere('q.createdAt >= :start')
            ->andWhere('q.createdAt <= :end')
            ->andWhere('q.accept = :accept')
            ->andWhere('q.category= :category')
            ->setParameter('start', $starter)
            ->setParameter('category', $category)
            ->setParameter('end', $ending)
            ->setParameter('accept', true)
            ->orderBy('q.id', 'ASC')
            ->getQuery()
            ->getResult()
        ;
    }


    /*
    public function findOneBySomeField($value): ?Questionnaire
    {
        return $this->createQueryBuilder('q')
            ->andWhere('q.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
