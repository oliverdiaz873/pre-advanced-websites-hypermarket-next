import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import './Footer.css'

export default async function Footer() {
    const t = await getTranslations('footer');
    const currentYear = new Date().getFullYear()

    return (
        <footer className="footer-global">
            <div className="footer-content">
                <small>
                    &copy; {currentYear} {t('company_name')}. {t('rights_reserved')}
                </small>

                <div className="social-icons">
                    <a
                        href="#"
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        aria-label={t('social.facebook')}
                        className="social-link"
                        title="Facebook"
                    >
                        <svg aria-hidden="true">
                            <use href="#icon-facebook" />
                        </svg>
                    </a>
                    <a
                        href="#"
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        aria-label={t('social.x')}
                        className="social-link"
                        title="X (Twitter)"
                    >
                        <svg aria-hidden="true">
                            <use href="#icon-x" />
                        </svg>
                    </a>
                    <a
                        href="#"
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        aria-label={t('social.instagram')}
                        className="social-link"
                        title="Instagram"
                    >
                        <svg aria-hidden="true">
                            <use href="#icon-instagram" />
                        </svg>
                    </a>
                </div>

                <div className="footer-links">
                    <Link href="/legal/privacy" title={t('links.privacy')}>
                        {t('links.privacy')}
                    </Link>
                    <span className="separator">|</span>
                    <Link href="/legal/terms" title={t('links.terms')}>
                        {t('links.terms')}
                    </Link>
                </div>
            </div>
        </footer>
    )
}


