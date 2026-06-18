# gemini.md - سجل تعلم Spring Boot

## 🚀 المشروع الأول: Task Manager API

- **التاريخ:** 14 يونيو 2026
- **الحالة:** تم إنشاء الهيكل، ربط قاعدة البيانات المحلية، وتشغيل الـ API بنجاح.
- **التقنيات المختارة:** Maven, Spring Web, Spring Data JPA, H2 (File-based).

---

## 🏗️ الملاحظة المعمارية (Clean Architecture)

نلتزم بتقسيم الكود كما نفعل في Laravel لضمان التنظيم وفصل المسؤوليات (Separation of Concerns):

1. **Controller:** لاستقبال الـ Requests وتوجيه الـ Responses (مثل الـ Controllers في Laravel).
2. **Service:** لاحتواء الـ Business Logic وهو المكان المفضل للعمليات الحقيقية.
3. **Repository:** للتعامل المباشر مع قاعدة البيانات (يقابل الـ Eloquent Model / Query Builder).

---

## 📘 قاموس المفاهيم والـ Annotations

- **Entity:** هو ما نسميه في Laravel "Model". نستخدم `@Entity` لربط الكلاس بجدول في قاعدة البيانات.
- **Annotations:** هي الكلمات التي تبدأ بـ `@` وهي الطريقة التي نتحدث بها مع Spring لتوجيهه وإعطائه صلاحيات للكلاس.
- **Repository Pattern:** نستخدم `JpaRepository` كـ Interface ليوفر لنا عمليات الـ CRUD الأساسية جاهزة تلقائياً دون
  كتابة SQL.
- **Dependency Injection (DI):** حقن التبعيات عبر الـ Constructor. نطلب الكائنات من Spring Container بدلاً من إنشائها
  يدوياً بـ `new`.
- **@RestController:** يخبر Spring أن هذا الكلاس سيعيد البيانات مباشرة بصيغة JSON.
- **@RequestBody:** لتحويل الـ JSON القادم في الـ Request Body إلى Object داخل جافا تلقائياً.

---

## 🛠️ الإعدادات وقاعدة البيانات (Configuration)

تم اعتماد **H2 Database بنمط الملف (File-based)** لتكون قاعدة بيانات محلية دائمية لا تختفي بياناتها عند إغلاق التطبيق،
وبدون مشوار تثبيت سيرفرات.

الملف: `src/main/resources/application.properties`

```properties
# مسار حفظ ملف قاعدة البيانات محلياً في مجلد المشروع
spring.datasource.url=jdbc:h2:file:./tasks
spring.datasource.driverClassName=org.h2.Driver
spring.jpa.hibernate.ddl-auto=update

# تمكين واجهة الإدارة لتصفح الجداول عبر المتصفح
spring.h2.console.enabled=true

### 4. عمليات إضافية (CRUD):
- **PUT:** لتحديث الموارد (`@PutMapping`).
- **DELETE:** لحذف الموارد (`@DeleteMapping`).
- **@PathVariable:** لاستخراج الـ ID من الرابط (URL) واستخدامه في العملية.

### 5. دالة جلب مهمة واحدة (Get by ID)
- **Controller:**
  ```java
  @GetMapping("/{id}")
  public Task getTaskById(@PathVariable Long id) {
      return taskService.findTaskById(id);
  }

### 6. التحقق من البيانات (Validation):
- **@NotBlank:** للتأكد من أن النص ليس فارغاً أو مسافات.
- **@Size:** لتحديد الحد الأدنى والحد الأعلى لطول النص.
- **@Valid:** توضع في الـ Controller لتقول لـ Spring "يا ريت تتأكد من صحة هذه البيانات قبل تمريرها للـ Service".

### 7. التوثيق (Documentation):
- **الأداة:** `springdoc-openapi-starter-webmvc-ui`.
- **المهمة:** توليد Swagger UI تلقائي لتوثيق الـ API (بديل Scramble في Laravel).
- **الرابط:** `/swagger-ui.html`.