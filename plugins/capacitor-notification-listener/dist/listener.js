import { registerPlugin } from "@capacitor/core";
const NotificationListener = registerPlugin("NotificationListener", {
  web: () => import("./web").then((m) => new m.NotificationWeb()),
});
export default NotificationListener;
//# sourceMappingURL=listener.js.map
