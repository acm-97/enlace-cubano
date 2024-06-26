import * as React from 'react'

import {useSelectedLanguage} from '@/core'
import {translate} from '@/core'
import type {Language} from '@/core/i18n/resources'
import type {Option} from '@/ui'
import {Icon, Options, useModal} from '@/ui'

import {Item} from '../item'

export const LanguageItem = () => {
  const {language, setLanguage} = useSelectedLanguage()
  const modal = useModal()
  const onSelect = React.useCallback(
    (option: Option) => {
      setLanguage(option.value as Language)
      modal.dismiss()
    },
    [setLanguage, modal],
  )

  const langs = React.useMemo(
    () => [
      {label: translate('settings.spanish'), value: 'es'},
      {label: translate('settings.english'), value: 'en'},
    ],
    [],
  )

  const selectedLanguage = React.useMemo(
    () => langs.find(lang => lang.value === language),
    [language, langs],
  )

  return (
    <>
      <Item
        text="settings.language"
        value={selectedLanguage?.label}
        icon={<Icon as="MaterialIcons" name="language" size={20} />}
        onPress={modal.present}
      />
      <Options
        ref={modal.ref}
        options={langs}
        onSelect={onSelect}
        value={selectedLanguage?.value ?? 'es'}
        title={translate('settings.language')}
      />
    </>
  )
}
