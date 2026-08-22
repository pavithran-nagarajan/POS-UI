import { MenuItem } from '../models/menu-item.model';

export const SIDEBAR_MENU: MenuItem[] = [
    {
        label: 'Dashboard', icon: 'bi-speedometer', active: true, open: true
    },
    {
        label: 'Configuration', icon: 'bi-gear',
        children: [
            { label: 'Company', link: '/company', icon: 'bi-building' },
            { label: 'Brand', link: '/brand', icon: 'bi-tags' },
            { label: 'Outlet', link: './outlet', icon: 'bi-shop' },
            {
                label: 'Module', icon: 'bi-puzzle',
                children: [
                    { label: 'POS', link: '/pos', icon: 'bi-cash-coin' },
                    { label: 'QR Order', link: './qr-order', icon: 'bi-qr-code-scan' },
                    { label: 'Online', link: './online', icon: 'bi-globe' },
                    { label: 'KIOSK', link: './kiosk', icon: 'bi-tablet' },
                    { label: 'Delivery Partner', link: './delivery-partner', icon: 'bi-truck' },
                    { label: 'KDS', link: './kds', icon: 'bi-fire' },
                    { label: 'Number Display', link: './number-display', icon: 'bi-tv' }
                ]
            },
            {
                label: 'Master Data', icon: 'bi-shop',
                children: [
                    { label: 'Country', link: '/country', icon: 'bi-flag' },
                    { label: 'Currency', link: './currency', icon: 'bi-currency-exchange' },
                    { label: 'Language', link: './language', icon: 'bi-translate' },
                    { label: 'Order Type', link: './order-type', icon: 'bi-list-check' },
                    { label: 'Service Hours', link: './service-hours', icon: 'bi-clock' },
                    { label: 'Role', link: './role', icon: 'bi-person-badge' }
                ]
            },
            { label: 'User', link: '/user', icon: 'bi-person' }
        ]
    },
    {
        label: 'Product', icon: 'bi-box-seam',
        children: [
            { label: 'Product Group', link: '/product-group', icon: 'bi-collection' },
            { label: 'Product', link: './product', icon: 'bi-box' }
        ]
    },
    {
        label: 'CRM', icon: 'bi-person-vcard',
        children: [
            { label: 'Customer', link: '/customer', icon: 'bi-people' },
            { label: 'Promotion', link: './promotion', icon: 'bi-megaphone' },
            { label: 'Customer Package', link: './customer-package', icon: 'bi-boxes' },
        ]
    },
    { label: 'Orders', link: './orders', icon: 'bi-bag-check' },
    {
        label: 'Report', icon: 'bi-bar-chart',
        children: [
            { label: 'Daily Sales', link: '/daily-sales-report', icon: 'bi-graph-up' },
            { label: 'Product Sales', link: './product-sales-report', icon: 'bi-basket' },
            { label: 'Customer Sales', link: './customer-sales-report', icon: 'bi-people' },
            {
                label: 'Voided Report', icon: 'bi-x-circle',
                children: [
                    { label: 'Voided Transaction', link: '/voided-transaction-report', icon: 'bi-receipt' },
                    { label: 'Voided Product', link: './voided-product-report', icon: 'bi-box-fill' }
                ]
            }
        ]
    },
    {
        label: 'ERP', icon: 'bi-diagram-3',
        children: [
            { label: 'Quick Books', link: '/quick-books', icon: 'bi-circle' },
            { label: 'Xero', link: '/xero', icon: 'bi-circle' }
        ]
    }
];