"use client"
import { useLocale } from 'next-intl';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';

export default function LocaleSwitcher() {
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      items={[
        {
          value: 'en',
          code: 'us',
          label: "English"
        },
        {
          value: 'fr',
          code: 'fr',
          label: "Français"
        }
      ]}
      label={"Changer la langue"}
    />
  );
}