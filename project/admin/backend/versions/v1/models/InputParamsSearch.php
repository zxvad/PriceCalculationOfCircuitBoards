<?php
namespace api\versions\v1\models;

use api\versions\v1\models\Formula;
use yii\data\ActiveDataProvider;
use yii\data\Sort;
use yii\data\Pagination;

class InputParamsSearch extends InputParams
{
    public $calculation_id;
    public function rules()
    {
        return [
            [['id', 'type', 'value', 'calculation_id'], 'safe'],
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
        $query = InputParamsSearch::find();

        $sort = new Sort([
            'attributes' => [
                'id',
                'formula_id',
                'type',
                'value',
                'added_on'
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

        $query->andFilterWhere(['like', 'title',  $this->value]);
        $query->andFilterWhere(['like', 'title',  $this->type]);
        $query->andFilterWhere(['=', 'formula.calculation_id',  \Yii::$app->getRequest()->getQueryParam('calculation_id')]);
        $query->joinWith(['formula']);
        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'sort'  => $sort,
            'pagination' => $pages
        ]);
        return $dataProvider;
    }
}