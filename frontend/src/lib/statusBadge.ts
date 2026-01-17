export type BadgeVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline";

export const getStatusBadgeVariant = (
  status: string
): { variant: BadgeVariant; className?: string } => {
  switch (status.toLowerCase()) {
    case "converted":
      return {
        variant: "default",
        className: "bg-green-600 text-white hover:bg-green-600",
      };
    case "qualified":
      return {
        variant: "default",
        className: "bg-blue-600 text-white hover:bg-blue-600",
      };
    case "contacted":
      return {
        variant: "secondary",
      };
    case "new":
      return {
        variant: "outline",
      };
    case "lost":
      return {
        variant: "destructive",
      };
    default:
      return {
        variant: "secondary",
      };
  }
};
