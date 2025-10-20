/**
 * quantclass-client
 * Copyright (c) 2025 量化小讲堂
 *
 * Licensed under the Business Source License 1.1 (BUSL-1.1).
 * Additional Use Grant: None
 * Change Date: 2028-08-22 | Change License: GPL-3.0-or-later
 * See the LICENSE file and https://mariadb.com/bsl11/
 */

import { userAtom } from "@/renderer/store/user"
import { useAtomValue } from "jotai"

export function usePermission() {
	const { isMember, isStock, isCrypto } = useAtomValue(userAtom)
	// 数据列表查询权限
	const checkDataListPermission = (courseType?: string) => {
		if (isMember) return false
		// 如果查到了权限checkPermission返回true，表格checked如果接收true会被禁用，所以做一下取反操作
		switch (courseType) {
			case "coin":
				return !isCrypto
			case "stock":
				return !isStock
			default:
				return true //默认禁用
		}
	}
	return { checkDataListPermission }
}
