import { Message } from 'element-ui';
import OSS from "ali-oss";
import { request } from "http";

export var success = function (msg) {
    Message.success({
        message: msg,
        type: "success"
    })
}


export var error = function (msg) {
    Message.error({
        message: msg,
        type: "error"
    })
}
 