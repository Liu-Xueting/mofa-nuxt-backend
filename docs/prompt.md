# 提示词

## 生成国际化

1. `Ctrl + Shift + I` 进入编辑模式
2. 选择国际化文件 `zh-CN.yaml` 和 `en-US.yaml`
3. > 根据中文翻译 `zh-CN.yaml` 更新英文国际化文件 `en-US.yaml`

## 生成 OpenAPI 定义

1. `Ctrl + I` 进入编辑模式
2. > add openapi definitions.

## 自动编写按照 ID 查询

1. `Ctrl + Shift + I` 进入编辑模式
2. 编写 API `[id]/index.get.ts`
   > 参考 `products/[id]/index.get.ts` 编写下列文件
   >
   > - `addresses/[id]/index.get.ts`
   >
   > 已经自动导入的服务在 `auto-imports.ts` 中，不需要手动导入。
3. 编写 API `[id]/update/index.post.ts`
   > 参考 `roles/create/index.post.ts` 编写下列文件
   >
   > - `addresses/create/index.post.ts`
   >
   > 已经自动导入的服务在 `auto-imports.ts` 中，不需要手动导入。
4. 编写 API `[id]/delete/index.post.ts`
   > 参考 `roles/update/index.post.ts` 编写下列文件
   >
   > - `addresses/update/index.post.ts`
   >
   > 已经自动导入的服务在 `auto-imports.ts` 中，不需要手动导入。
5. 编写 API `[id]/delete/index.post.ts`
   > 参考 `roles/[id]/delete/index.post.ts` 编写下列文件
   >
   > - `addresses/[id]/delete/index.post.ts`
   >
   > 已经自动导入的服务在 `auto-imports.ts` 中，不需要手动导入。
6. 编写 Schema
   > 参考 `schema/modules/role.ts` 编写下列文件
   >
   > - `address.ts`
   >
   > 在 `models.ts` 中预定义了一些 Schema，尽量导入预定义的 Schema 以便管理，例如使用 `nameSchema` 来表示一般长度的文本，使用 `longNameSchema` 表示较长的文本，避免直接使用 Zod 定义内容。参照 `schema.prisma` 文件中的对应字段来设计。
7. 编写服务
   > 参考 `services/modules/role.ts` 更新下列服务的创建和更新方法。
   >
   > - `address.ts`
   >
   > 在 `schema/modules/role.ts` 中预定义了一些 Schema，可参照服务对应的 Schema 来设计创建和更新方法。

## API 列表

- `addresses`
- `agents`
- `agents/applies`
- `agents/receipts`
- `articles`
- `award/tasks`
- `cart/items`
- `chat/contacts`
- `chat/messages`
- `deliveries`
- `deliveries/items`
- `employers`
- `follows`
- `hunters`
- `menus`
- `notifications`
- `orders`
- `orders/after-sales`
- `orders/comments`
- `orders/items`
- `permissions`
- `products`
- `products/catalogs`
- `products/categories`
- `products/groups`
- `resources/skus`
- `resources/tags`
- `resources`
- `resources/catalogs`
- `retailers`
- `transactions`

## 服务列表

- `address.ts`
- `agent.ts`
- `agent-apply.ts`
- `agent-receipt.ts`
- `article.ts`
- `product-catalog.ts`
- `product-category.ts`
- `product-group.ts`
- `award-task.ts`
- `cart-item.ts`
- `delivery.ts`
- `delivery-item.ts`
- `employer.ts`
- `follow.ts`
- `hunter.ts`
- `menu.ts`
- `notification.ts`
- `order.ts`
- `after-sale.ts`
- `order-comment.ts`
- `order-item.ts`
- `resource.ts`
- `resource-catalog.ts`
- `transaction.ts`
