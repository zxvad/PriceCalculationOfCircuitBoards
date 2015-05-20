<?php
namespace api\components\rest;

use api\versions\v1\models\Formula;
use yii\rest\CreateAction;
use yii;
use yii\web\ServerErrorHttpException;

class InputParamsCreateAction extends CreateAction
{
    public function run($id = null)
    {
        if ($this->checkAccess) {
            call_user_func($this->checkAccess, $this->id);
        }
        $model = new $this->modelClass();
        $model->load(Yii::$app->getRequest()->getBodyParams(), '');
        $formula = new Formula();
        $formula->variable = Yii::$app->getRequest()->getBodyParam('variable');
        $formula->type = Formula::INPUT_TYPE;
        $formula->title = Yii::$app->getRequest()->getBodyParam('title');
        $formula->calculation_id = Yii::$app->getRequest()->getBodyParam('calculation_id');
        if ($formula->validate()) {
            $formula->save();
            $model->formula_id = $formula->id;
            $model->save();
        }
        else {
            return $formula;
        }
        return $model;
    }
}