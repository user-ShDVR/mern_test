export const DEFAULT_ORDER_LIMIT_IN_ORDERS_PAGE = 3;

export const DEFAULT_VALIDATE_MESSAGE = "Пожалуйста, введите";

export const stepsLabels = {
  delivery: "Доставка",
  payment: "Оплата",
};

export const deliveryLabels = {
  locality: "Населенный пункт",
  street: "Улица",
  house: "Дом",
  flat: "Квартира",
  comment: "Комментарий",
};

export const deliveryDataIndexes = {
  locality: "locality",
  street: "street",
  house: "house",
  flat: "flat",
  comment: "comment",
};

export const paymentLabels = {
  cardNumber: "Номер карты",
  nameAndSurname: "Имя и фамилия",
  month: "Месяц",
  year: "Год",
  cvc: "CVV/CVC",
};

export const paymentDataIndexes = {
  cardNumber: "cardNumber",
  nameAndSurname: "nameAndSurname",
  month: "month",
  year: "year",
  cvc: "cvc",
};

export const citiesOptions = [
  { label: "Москва", value: "Moscow" },
  { label: "Санкт-Петербург", value: "Saint Petersburg" },
  { label: "Новосибирск", value: "Novosibirsk" },
  { label: "Екатеринбург", value: "Yekaterinburg" },
  { label: "Казань", value: "Kazan" },
  { label: "Нижний Новгород", value: "Nizhny Novgorod" },
  { label: "Челябинск", value: "Chelyabinsk" },
  { label: "Самара", value: "Samara" },
  { label: "Омск", value: "Omsk" },
  { label: "Ростов-на-Дону", value: "Rostov-on-Don" },
  { label: "Уфа", value: "Ufa" },
  { label: "Красноярск", value: "Krasnoyarsk" },
  { label: "Пермь", value: "Perm" },
  { label: "Воронеж", value: "Voronezh" },
  { label: "Волгоград", value: "Volgograd" },
  { label: "Краснодар", value: "Krasnodar" },
  { label: "Ульяновск", value: "Ulyanovsk" },
  { label: "Владивосток", value: "Vladivostok" },
  { label: "Ярославль", value: "Yaroslavl" },
  { label: "Ижевск", value: "Izhevsk" },
  { label: "Тюмень", value: "Tyumen" },
  { label: "Барнаул", value: "Barnaul" },
  { label: "Саратов", value: "Saratov" },
  { label: "Тольятти", value: "Tolyatti" },
  { label: "Томск", value: "Tomsk" },
  { label: "Магнитогорск", value: "Magnitogorsk" },
  { label: "Набережные Челны", value: "Nabereshnye Chelny" },
  { label: "Иркутск", value: "Irkutsk" },
  { label: "Оренбург", value: "Orenburg" },
  { label: "Кемерово", value: "Kemerovo" },
  { label: "Рязань", value: "Ryazan" },
  { label: "Нижний Тагил", value: "Nizhny Tagil" },
  { label: "Астрахань", value: "Astrakhan" },
  { label: "Пенза", value: "Penza" },
  { label: "Липецк", value: "Lipetsk" },
  { label: "Тверь", value: "Tver" },
  { label: "Чебоксары", value: "Cheboksary" },
  { label: "Улан-Удэ", value: "Ulan-Ude" },
  { label: "Сургут", value: "Surgut" },
  { label: "Иваново", value: "Ivanovo" },
  { label: "Брянск", value: "Bryansk" },
  { label: "Махачкала", value: "Makhachkala" },
  { label: "Якутск", value: "Yakutsk" },
  { label: "Грозный", value: "Grozny" },
  { label: "Севастополь", value: "Sevastopol" },
];

export const monthsOptions = [
  { label: "Январь", value: "january" },
  { label: "Февраль", value: "february" },
  { label: "Март", value: "march" },
  { label: "Апрель", value: "april" },
  { label: "Май", value: "may" },
  { label: "Июнь", value: "june" },
  { label: "Июль", value: "july" },
  { label: "Август", value: "august" },
  { label: "Сентябрь", value: "september" },
  { label: "Октябрь", value: "october" },
  { label: "Ноябрь", value: "november" },
  { label: "Декабрь", value: "december" },
];

const currentYear = new Date().getFullYear();
export const yearsOptions: Record<string, string>[] = [];
for (let year = 1900; year <= currentYear; year++) {
  yearsOptions.push({ label: year.toString(), value: year.toString() });
}
yearsOptions.reverse();
