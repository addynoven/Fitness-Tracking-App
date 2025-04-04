export const hasPrivilegeAccess = (req: any, res: any, next: any) => {
  if (req.user.role === "admin" || req.user.role === "moderator") {
    next();
  } else {
    res.status(403).send("Forbidden");
  }
};
