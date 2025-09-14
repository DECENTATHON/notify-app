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
    { href: '/main', label: 'Кабинет менеджера', icon: <HomeOutlined /> },
    { href: '/notify', label: 'Уведомления', icon: <TeamOutlined /> },
    // { href: '/', label: 'Выйти', icon: <LogoutOutlined /> },
];
