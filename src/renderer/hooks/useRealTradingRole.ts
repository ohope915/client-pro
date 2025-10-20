/**
 * quantclass-client
 * Copyright (c) 2025 量化小讲堂
 *
 * Licensed under the Business Source License 1.1 (BUSL-1.1).
 * Additional Use Grant: None
 * Change Date: 2028-08-22 | Change License: GPL-3.0-or-later
 * See the LICENSE file and https://mariadb.com/bsl11/
 */

import { isWindows } from "@/renderer/constant"
import { userAtom } from "@/renderer/store/user"
import { useAtomValue } from "jotai"

const { VITE_XBX_ENV } = import.meta.env

export const useRealTradingRole = () => {
	const { isMember } = useAtomValue(userAtom)

	if (VITE_XBX_ENV === "development") {
		return true
	}

	return isMember && isWindows && VITE_XBX_ENV === "production"
}
