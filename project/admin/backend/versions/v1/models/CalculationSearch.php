<?php
namespace api\versions\v1\models;

use api\versions\v1\models\Formula;
use yii\data\ActiveDataProvider;
use yii\data\Sort;
use yii\data\Pagination;

class CalculationSearch extends Calculation
{
    public function rules()
    {
        return [
            [['id', 'title'], 'safe'],
        ];

    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $query = CalculationSearch::find();

        $sort = new Sort([
            'attributes' => [
                'id',
                'title',
            ],
        ]);

        if (!empty($params['order'])) {
            $typeOrder = ($params['order'][0]=='+' ? SORT_ASC : SORT_DESC);
            $sort->defaultOrder = array(substr($params['order'], 1, strlen($params['order'])) => $typeOrder);
        }

        $pages = new Pagination();
        $perPage = isset($params['perPage']) ? $params['perPage'] : null;

        if (!empty($perPage)) {
            $pages->pageSize = $perPage;
            $pages->page = isset($params['page']) ? $params['page'] : null;
            if ($perPage == 'all') {
                $pages = false;
            }
        }
        $this->load(['CalculationSearch'=>$params]);

        //$query->andFilterWhere(['like', 'title',  $this->title]);

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'sort'  => $sort,
            'pagination' => $pages
        ]);
        return $dataProvider;
    }
}