"use strict";
import path from "path"
import * as dotenv from "dotenv";

dotenv.config({ path: path.resolve('./src/config/.env.prod') });



//_______________________ES6_____________________________________________
import bootstrap from'./src/app.controller.js';
//____________________________________________________________________
import express from "express";

const app = express();
//____________________________________________________________________



//____________________________________________________________________

bootstrap(app, express);

const server = app.listen(process.env.PORT, "localhost", 511, () => {
  console.log(`Server is running on localhost ${process.env.PORT}`);
});

server.on("error", (err) => {
  if (err.code == "EADDRINUSE") {
    //  PORT=3001
    console.error("server error..invalid port...port token");
    // setTimeout(() => {
    //   server.listen(port)
    // }, 1000);
    //or
    setTimeout(() => {
      server.close();
      server.listen(process.env.PORT);
    }, 1000);
  }
});
//_______________________________________________________________________




/*  HTTP Status
1xx: معلوماتي (Informational)
100 Continue: يشير إلى أن الجزء الأول من الطلب تم استلامه، ويمكن للعميل الاستمرار.
101 Switching Protocols: يشير إلى أن السيرفر يوافق على تغيير البروتوكولات.
102 Processing: يشير إلى أن الطلب قيد المعالجة (WebDAV).
__________________________-
2xx: نجاح (Success)
200 OK: الطلب نجح، وتم تقديم النتيجة.
201 Created: الطلب تم بنجاح، وتم إنشاء مورد جديد.
202 Accepted: تم استلام الطلب لكنه قيد التنفيذ.
203 Non-Authoritative Information: استجابة ناجحة لكن البيانات ليست أصلية.
204 No Content: الطلب نجح، لكن لا توجد بيانات لإرسالها.
205 Reset Content: الطلب نجح، ويجب على العميل إعادة تعيين العرض.
206 Partial Content: تم تقديم جزء من البيانات (يستخدم مع طلبات Range).
_________________________________________________________________-
3xx: إعادة توجيه (Redirection)
300 Multiple Choices: عدة اختيارات متاحة للموارد المطلوبة.
301 Moved Permanently: المورد تم نقله بشكل دائم.
302 Found: المورد موجود مؤقتًا في موقع مختلف.
303 See Other: يمكن العثور على المورد في مكان آخر باستخدام GET.
304 Not Modified: لم يتم تعديل المورد، يمكن استخدام النسخة المخزنة.
307 Temporary Redirect: إعادة توجيه مؤقتة، بنفس طريقة الطلب الأصلي.
308 Permanent Redirect: إعادة توجيه دائمة، بنفس طريقة الطلب الأصلي.
_____________________________________________________________________
4xx: خطأ من العميل (Client Error)
400 Bad Request: الطلب غير صحيح أو لا يمكن معالجته.
401 Unauthorized: المصادقة مطلوبة ولكنها غير صحيحة.
403 Forbidden: الوصول ممنوع.
404 Not Found: المورد غير موجود.
405 Method Not Allowed: طريقة الطلب غير مسموح بها.
406 Not Acceptable: نوع الاستجابة المطلوب غير متوفر.
408 Request Timeout: انتهت مهلة الطلب.
409 Conflict: تعارض في الطلب.
410 Gone: المورد لم يعد متوفرًا.
411 Length Required: يجب تحديد طول المحتوى.
413 Payload Too Large: البيانات المرسلة كبيرة جدًا.
414 URI Too Long: الرابط طويل جدًا.
415 Unsupported Media Type: نوع المحتوى غير مدعوم.
429 Too Many Requests: تم إرسال طلبات كثيرة خلال وقت قصير.
______________________________________________________________________________
5xx: خطأ من السيرفر (Server Error)
500 Internal Server Error: خطأ عام في السيرفر.
501 Not Implemented: السيرفر لا يدعم الوظيفة المطلوبة.
502 Bad Gateway: استجابة غير صحيحة من سيرفر آخر.
503 Service Unavailable: الخدمة غير متاحة مؤقتًا.
504 Gateway Timeout: انتهت مهلة الاستجابة من السيرفر الآخر.
505 HTTP Version Not Supported: إصدار HTTP غير مدعوم.
____________________________________________________________-

*/