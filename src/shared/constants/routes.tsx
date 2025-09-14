import {
    HomeOutlined,
    UserOutlined,
    BarChartOutlined,
    PieChartOutlined,
    TeamOutlined,
    FileTextOutlined,
    ClockCircleOutlined,
    TrophyOutlined,
    LogoutOutlined,
} from '@ant-design/icons';

export const sidebarRoutes = [
    { href: '/total', label: 'Общая сводка', icon: <HomeOutlined /> },
    { href: '/main', label: 'Аналитика по', icon: <TeamOutlined /> },
    { href: '/teacher', label: 'Аналитика по', icon: <UserOutlined /> },
    { href: '/features', label: 'Аналитика по', icon: <PieChartOutlined /> },
    { href: '/class', label: 'Аналитика по ', icon: <BarChartOutlined /> },
    { href: '/time', label: 'Аналитика по', icon: <ClockCircleOutlined /> },
    { href: '/top', label: 'Аналитика ', icon: <TrophyOutlined /> },
    { href: '/', label: 'Выйти', icon: <LogoutOutlined /> },
];
