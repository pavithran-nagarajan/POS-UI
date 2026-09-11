import { type MenuItem } from './sidebar.model';

export const SIDEBAR_MENU: MenuItem[] = [
    {
        active: true, icon: 'bi-speedometer', label: 'Dashboard', link: '/dashboard', open: true
    },
    {
        children: [
            { icon: 'bi-building', label: 'Company', link: '/company' },
            { icon: 'bi-tags', label: 'Brand', link: '/brand' },
            { icon: 'bi-shop', label: 'Outlet', link: './outlet' },
            {
                children: [
                    { icon: 'bi-cash-coin', label: 'POS', link: '/pos' },
                    { icon: 'bi-qr-code-scan', label: 'QR Order', link: './qr-order' },
                    { icon: 'bi-globe', label: 'Online', link: './online' },
                    { icon: 'bi-tablet', label: 'KIOSK', link: './kiosk' },
                    { icon: 'bi-truck', label: 'Delivery Partner', link: './delivery-partner' },
                    { icon: 'bi-fire', label: 'KDS', link: './kds' },
                    { icon: 'bi-tv', label: 'Number Display', link: './number-display' }
                ], icon: 'bi-puzzle',
                label: 'Module'
            },
            {
                children: [
                    { icon: 'bi-flag', label: 'Country', link: '/country' },
                    { icon: 'bi-currency-exchange', label: 'Currency', link: './currency' },
                    { icon: 'bi-translate', label: 'Language', link: './language' },
                    { icon: 'bi-list-check', label: 'Order Type', link: './order-type' },
                    { icon: 'bi-clock', label: 'Service Hours', link: './service-hours' },
                    { icon: 'bi-person-badge', label: 'Role', link: './role' }
                ], icon: 'bi-shop',
                label: 'Master Data'
            },
            { icon: 'bi-person', label: 'User', link: '/user' }
        ], icon: 'bi-gear',
        label: 'Configuration'
    },
    {
        children: [
            { icon: 'bi-collection', label: 'Product Group', link: '/product-group' },
            { icon: 'bi-box', label: 'Product', link: './product' }
        ], icon: 'bi-box-seam',
        label: 'Product'
    },
    {
        children: [
            { icon: 'bi-people', label: 'Customer', link: '/customer' },
            { icon: 'bi-megaphone', label: 'Promotion', link: './promotion' },
            { icon: 'bi-boxes', label: 'Customer Package', link: './customer-package' },
        ], icon: 'bi-person-vcard',
        label: 'CRM'
    },
    { icon: 'bi-bag-check', label: 'Orders', link: './orders' },
    {
        children: [
            { icon: 'bi-graph-up', label: 'Daily Sales', link: '/daily-sales-report' },
            { icon: 'bi-basket', label: 'Product Sales', link: './product-sales-report' },
            { icon: 'bi-people', label: 'Customer Sales', link: './customer-sales-report' },
            {
                children: [
                    { icon: 'bi-receipt', label: 'Voided Transaction', link: '/voided-transaction-report' },
                    { icon: 'bi-box-fill', label: 'Voided Product', link: './voided-product-report' }
                ], icon: 'bi-x-circle',
                label: 'Voided Report'
            }
        ], icon: 'bi-bar-chart',
        label: 'Report'
    },
    {
        children: [
            { icon: 'bi-circle', label: 'Quick Books', link: '/quick-books' },
            { icon: 'bi-circle', label: 'Xero', link: '/xero' }
        ], icon: 'bi-diagram-3',
        label: 'ERP'
    }
];