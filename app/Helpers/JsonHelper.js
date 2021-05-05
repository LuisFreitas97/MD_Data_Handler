export class JsonHelper {
    static convertJson(data) {
        var array = [];
        if (typeof data === "object") {
            array.push(data)
        } else if (typeof data === "array") {
            array = data;
        } else {
            return null;
        }
        return array;
    }
};

