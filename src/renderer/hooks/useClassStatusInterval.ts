/**
 * quantclass-client
 * Copyright (c) 2025 量化小讲堂
 *
 * Licensed under the Business Source License 1.1 (BUSL-1.1).
 * Additional Use Grant: None
 * Change Date: 2028-08-22 | Change License: GPL-3.0-or-later
 * See the LICENSE file and https://mariadb.com/bsl11/
 */

import { accountKeyAtom } from "@/renderer/store/storage"
import { atomWithQuery } from "jotai-tanstack-query"

const { VITE_BASE_URL } = import.meta.env

// -- 状态查询 atom
export const statusQueryAtom = atomWithQuery((get) => {
	const { uuid, apiKey } = get(accountKeyAtom)

	return {
		queryKey: ["status", uuid, apiKey],
		queryFn: async () => {
			if (!uuid || !apiKey) return null

			const headers = { "api-key": apiKey }
			const params = new URLSearchParams({ uuid })
			const url = `${VITE_BASE_URL}/api/data/status?${params}`
			const response = await fetch(url, { headers })
			return response.json() as Promise<{ msg: string; role: 0 | 1 | 2 }>
		},
		refetchInterval: 1000 * 60 * 60 * 24, // -- 24 小时轮询一次
		retry: false,
		enabled: Boolean(uuid && apiKey),
	}
})
