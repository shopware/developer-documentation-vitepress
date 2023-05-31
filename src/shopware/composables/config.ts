import {
  Component,
  computed,
  defineComponent,
  h,
  inject,
  InjectionKey,
  provide,
  Ref
} from 'vue'
import { useData } from 'vitepress'
import {
  Config,
  MultiSidebarConfig,
  SidebarConfig,
  SidebarGroup
} from '../config'
import { MenuItem, MenuItemChild } from '../../core'
import { normalizeLink } from '../support/utils'

export const configSymbol: InjectionKey<Ref<Config>> = Symbol('config')

const requireConfig = () => {
  let config = inject(configSymbol)
  if (!config) {
    const {theme} = useData()
    config = computed(() => resolveConfig(theme.value))
  }

  return config;
}

/**
 * Wrap root App component to provide the resolved theme config
 * so that we reuse the same computed ref across the entire app instead of
 * re-creating one in every consumer component.
 */
export function withConfigProvider(App: Component) {
  return defineComponent({
    name: 'VPConfigProvider',
    setup(_, { slots }) {
      const config = requireConfig();
      provide(configSymbol, config)
      return () => h(App, null, slots)
    }
  })
}

export function useConfig() {
  return {
    config: requireConfig()
  }
}

function resolveConfig(config: Config): Config {
  return Object.assign(
    {
      appearance: true
    },
    config,
    {
      nav: config.nav?.map(normalizeMenuItem),
      sidebar: config.sidebar && normalizeSideBar(config.sidebar)
    }
  )
}

function normalizeMenuItem<T extends MenuItem | MenuItemChild>(item: T): T {
  if ('link' in item) {
    return Object.assign({}, item, {
      link: normalizeLink(item.link)
    })
  } else {
    return Object.assign({}, item, { items: item.items.map(normalizeMenuItem) })
  }
}

function normalizeSideBar(sidebar: SidebarConfig): SidebarConfig {
  if (Array.isArray(sidebar)) {
    return sidebar.map(normalizeMenuItem)
  } else {
    const ret: MultiSidebarConfig = {}
    for (const key in sidebar) {
      ret[key] = normalizeSideBar(sidebar[key]) as SidebarGroup[]
    }
    return ret
  }
}
