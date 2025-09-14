import {TNotification, TValidation} from "@/shared/types";

export const validation: Record<TValidation, any> = {
  REQUIRED: "Обязательное поле",
  EMAIL: "Некорректный email",
  NOT_REPEAT_PASSWORD: "Пароли не совпадают",
  NOT_VALID_PERIOD: "Некорректный период",
  LINK: "Введите корректную ссылку",
  
};

export const notification: Record<TNotification, string> = {
  news: "Рассылка",
  new: "Новое",
};
