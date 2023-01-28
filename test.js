import http from "k6/http"
import { check, sleep } from "k6";

export let options = {
    stages: [
        {
            duration: "30s", target: 500
        },
        {
            duration: "1m30s", target: 500
        },
        {
            duration: "30s", target: 0
        }
    ]
}

export default function () {
    let res = http.get("https://maket1.tconf.rt.ru/");
    check(res, {
        "status was 200": (r) => r.status == 20,
        "transaction time OK": (r) => r.timings.duration < 200
    });
    sleep(1);
}