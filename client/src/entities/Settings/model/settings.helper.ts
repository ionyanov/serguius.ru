import { Settings } from "@/shared/types/enums";
import { useInitSettingsQuery } from "./settings.api";

export function getSettings<T>(item: Settings, defaultValue?: T): T | undefined {
	const { data } = useInitSettingsQuery();

	return data?.[item] as T ?? defaultValue
}