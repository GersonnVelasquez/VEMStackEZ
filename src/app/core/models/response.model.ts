
export class Response {
    ruleEvaluationResults: any[];
    Result: number;
    Details: string;
    JsonData: string;
    ObjectType: string;

    get getJsonData(): any {
        return JSON.parse(this.JsonData);
    }

    public constructor(item: Response) {
        this.ruleEvaluationResults = item.ruleEvaluationResults;
        this.Result = item.Result;
        this.Details = item.Details;
        this.JsonData = item.JsonData;
        this.ObjectType = item.ObjectType;
    }

    public get isError() {
        if (this.Result === 2) {
            return false;
        }
        if (this.Result === 3) {
            return false;
        }
        return true;
    }

}