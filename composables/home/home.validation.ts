import { number, object, string } from "yup";

export const useAdvancedSearchValidation = () => {
  const { $t } = useNuxtApp();
  const schema = object({
    architecture_id: number().required().label($t("architecture_id")),
    docType: string().required().label($t("docType")),
    process_id: number().nullable().label($t("process_id")),
    itemSearch: string().nullable().label($t("itemSearch")),
    wordSearch: string().nullable().label($t("wordSearch")),
    page: number().nullable().label($t("wordSearch"))
  });
  return { schema };
};
export const useSearchValidation = () => {
  const { $t } = useNuxtApp();
  const schema = object({
    search: string().required().label($t("wordSearch")),
  });
  return { schema };
};
