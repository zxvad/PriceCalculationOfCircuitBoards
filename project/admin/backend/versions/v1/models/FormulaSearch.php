<?php
namespace api\versions\v1\models;

use api\versions\v1\models\Formula;
use yii\data\ActiveDataProvider;
use yii\data\Sort;
use yii\data\Pagination;

class FormulaSearch extends Formula
{

    public $addedBy_name;

    public function rules()
    {
        return [
            [['type', 'variable', 'title', 'expression', 'added_on', 'added_by', 'calculation_id'], 'safe'],
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
        $query = FormulaSearch::find()->andFilterWhere(['in', 'formula.type',['constant', 'formula']]);

        $sort = new Sort([
            'attributes' => [
                'type',
                'variable',
                'title',
                'expression',
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
        $this->load(['FormulaSearch'=>$params]);

        $query->andFilterWhere(['=', 'formula.type',  $this->type]);
        $query->andFilterWhere(['=', 'formula.calculation_id',  \Yii::$app->getRequest()->getQueryParam('calculation_id')]);
        $query->andFilterWhere(['like', 'formula.variable',  $this->variable]);
        $query->andFilterWhere(['like', 'formula.title', $this->title]);
        $query->andFilterWhere(['like', 'formula.expression', $this->expression]);

        //$sql = $query->createCommand()->rawSql;
        //die($sql);

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'sort'  => $sort,
            'pagination' => $pages
        ]);
        return $dataProvider;
    }
}