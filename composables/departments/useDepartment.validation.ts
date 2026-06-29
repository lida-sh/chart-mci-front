import { object, string, mixed, array, number } from "yup";
const validFileExtensions = [
  "jpg",
  "gif",
  "png",
  "jpeg",
  "pdf",
  "docx",
  "doc",
  "bpm",
  "tiff",
];
const MAX_FILE_SIZE = 102400000;

function isValidFileType(fileName: string): boolean {
  return (
    !!fileName &&
    validFileExtensions.indexOf(fileName.split(".").pop() || "") > -1
  );
}
export const useDepartmentValidation = () => {
  const { $t } = useNuxtApp();

  const schema = object({
    architecture_id: number().required().label($t("architecture_id")),
    directorate_id: number().nullable().label($t("directorate_id")),
    title: string().required().label($t("title")),
    status: string().required().label($t("status")),
    occupied: string().required().label($t("occupied")),
    evaluated_expert_positions_count: string().required().label($t("evaluated_expert_positions_count")),
    old_permanent_experts_count: string().required().label($t("old_permanent_experts_count")),
    old_contracting_experts_count: string().required().label($t("old_contracting_experts_count")),
    old_below_expert_count: string().required().label($t("old_below_expert_count")),
    description: string().nullable().label($t("description")),
    files: array()
      .nullable()
      .test(
        "fileSize",
        "اندازه هر یک از فایل ها نباید بیشتر از یک مگا بایت باشد.",
        (files) => {
          if (!files || files.length === 0) return true;
          return files && files.every((file) => file.size <= MAX_FILE_SIZE); // max 5MB
        }
      )
      .test(
        "fileType",
        "فرمت فایل باید jpg، jpeg، png، bpm، tiff، gif، doc، docx و یا pdf باشد.",
        (files) => {
          if (!files || files.length === 0) return true;
          return (
            files &&
            files.every((file) => isValidFileType(file.name.toLowerCase()))
          );
        }
      )
      .label($t("files")),
  });
  return { schema };
};
export const useEditDepartmentValidation = () => {
  const { $t } = useNuxtApp();

  const schema = object({
    architecture_id: number().required().label($t("architecture_id")),
    directorate_id: number().nullable().label($t("directorate_id")),
    title: string().required().label($t("title")),
    status: string().required().label($t("status")),
    occupied: string().required().label($t("occupied")),
    evaluated_expert_positions_count: string().required().label($t("evaluated_expert_positions_count")),
    old_permanent_experts_count: string().required().label($t("old_permanent_experts_count")),
    old_contracting_experts_count: string().required().label($t("old_contracting_experts_count")),
    old_below_expert_count: string().required().label($t("old_below_expert_count")),
    description: string().nullable().label($t("description")),
    files: array()
      .nullable()
      .test(
        "fileSize",
        "اندازه هر یک از فایل ها نباید بیشتر از یک مگا بایت باشد.",
        (files) => {
          if (!files || files.length === 0) return true;
          return files && files.every((file) => file.size <= MAX_FILE_SIZE); // max 5MB
        }
      )
      .test(
        "fileType",
        "فرمت فایل باید jpg، jpeg، png، bpm، tiff، gif، doc، docx و یا pdf باشد.",
        (files) => {
          if (!files || files.length === 0) return true;
          return (
            files &&
            files.every((file) => isValidFileType(file.name.toLowerCase()))
          );
        }
      )
      .label($t("files")),
    fileIdsForDelete: mixed(),
  });
  return { schema };
};
export const useDepartmentFilter = () => {
  const { $t } = useNuxtApp();

  const schema = object({
    search: string().required("${path} وارد نشده است.").label($t("search")),
  });
  return { schema };
};
