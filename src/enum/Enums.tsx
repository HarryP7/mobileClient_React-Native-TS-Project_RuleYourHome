export enum Access{
    public = 'Окрытая группа',
    private = 'Закрытая группа'
}

export enum Category {
    Repairs = 'Ремонт',
    EngineeringWorks='Технические работы',
    Overhaul='Капитальный ремонт',
    EnergySaving='Энергосбережение',
    Owners='Владельцы',
    CommunityInfrastructure='Инфраструктура сообщества',
    Attention='Внимание'
}

export enum HomeStatus{
    Exploited = 'Эксплуатируемый дом',
    Emergency = 'Аварийный дом'
}

export enum GroupStatus{
    Public = 'Открытая группа',
    Pravite = 'Закрытая группа'
}

export enum Gender 
{
    undefined = 'Не задан',
    male = 'мужской',
    female = 'женский'
}

export enum Role {
    admin = 1,
    user = 2,
    moderator = 3,
}