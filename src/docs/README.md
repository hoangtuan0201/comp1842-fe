# Tài liệu dự án COMP1842

## Tổng quan

- Front-end: Vue 3, vue-router v4, ESLint, axios, semantic-ui-css.
- Back-end: Node.js (Express), Mongoose v7, dotenv, REST API cho vocabulary.
- Kết nối: front-end gọi API tại `http://localhost:3000/words`.

## Cấu trúc thư mục

- `front-end/`: ứng dụng Vue.
  - `src/main.js`: khởi tạo app bằng `createApp` (Vue 3).
  - `src/router.js`: cấu hình router (vue-router v4).
  - `src/views/Words.vue`: danh sách từ; gọi `api.getWords()`.
  - `src/views/Show.vue`: xem chi tiết từ; gọi `api.getWord(id)`.
  - `src/views/Edit.vue`: chỉnh sửa từ; dùng `<word-form>` và `api.updateWord()`.
  - `src/components/WordForm.vue`: form nhập, dùng state cục bộ `localWord` và emit `submit`.
  - `src/helpers/helpers.js`: axios helpers cho CRUD.
- `vocab-builder/server/`: API server Express.
  - `server.js`: cấu hình Express, CORS, body-parser, nạp `.env` và kết nối MongoDB.
  - `api/models/vocabModel.js`: schema Mongoose cho `Vocab`.
  - `api/controllers/vocabController.js`: controller với `async/await` cho CRUD.
  - `api/routes/vocabRoutes.js`: map route REST vào controller.
  - `scripts/seed.js`: script seed 5 documents.

## Công nghệ và phiên bản

- Vue 3 (`createApp`) thay cho Vue 2 (`new Vue`). Tham chiếu: `front-end/src/main.js:1-6`.
- vue-router v4 (`createRouter`, `createWebHistory`). Tham chiếu: `front-end/src/router.js:1-6,17-20`.
- Mongoose v7 bỏ callback; dùng Promise/`async/await`. Tham chiếu: `vocab-builder/server/api/controllers/vocabController.js:4-48`.
- dotenv để nạp `.env` (không commit secrets). Tham chiếu: `vocab-builder/server/server.js:2`.

## Lệnh hữu ích

- Front-end:
  - Cài deps: `npm i` (trong `front-end/`).
  - Dev server: `npm run serve`.
  - Lint: `npm run lint`.
- Back-end:
  - Cài deps: `npm i` (trong `vocab-builder/server/`).
  - Start API: `npm start`.
  - Seed dữ liệu: `npm run seed`.

## API endpoints

- `GET /words` → trả danh sách từ. Tham chiếu: `vocab-builder/server/api/controllers/vocabController.js:4-12`.
- `GET /words/:wordId` → trả chi tiết từ. Tham chiếu: `vocab-builder/server/api/controllers/vocabController.js:19-24`.
- `POST /words` → tạo từ mới. Tham chiếu: `vocab-builder/server/api/controllers/vocabController.js:11-17`.
- `PUT /words/:wordId` → cập nhật từ. Tham chiếu: `vocab-builder/server/api/controllers/vocabController.js:26-36`.
- `DELETE /words/:wordId` → xoá từ. Tham chiếu: `vocab-builder/server/api/controllers/vocabController.js:37-48`.


## Kiến thức rút ra

- Đổi API khi nâng phiên bản: Vue 3 và vue-router v4 thay đổi cách khởi tạo.
- Quản lý cấu hình với `.env`: nạp đúng đường dẫn và không commit secrets.
- Theo dõi thay đổi breaking trong thư viện: Mongoose v7 loại bỏ callback.

## Bảo mật

- Không commit thông tin nhạy cảm trong `.env` (username/password/connection string). Luôn kiểm tra `.gitignore` để loại trừ.

## Quy trình chạy dự án

1. Chạy API:
   - Đặt biến môi trường trong `vocab-builder/.env` (`CONNECTION_STRING`, `PORT`).
   - `cd vocab-builder/server && npm i && npm start`.
   - (Tuỳ chọn) `npm run seed` để có 5 records mẫu.
2. Chạy front-end:
   - `cd front-end && npm i && npm run serve`.
3. Truy cập `http://localhost:8080/words` để xem danh sách; dùng link “Show” để xem chi tiết, “Edit” để cập nhật.

