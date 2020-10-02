import { FormControl, FormGroup } from "@angular/forms";
export class PWChangeValidators {
  static newIsNotOld(group: FormGroup) {
    var newPW = group.controls["newPW"];
    if (group.controls["current"].value == newPW.value)
      newPW.setErrors({ newIsNotOld: true });
    return null;
  }

  static newMatchesConfirm(group: FormGroup) {
    var confirm = group.controls["confirm"];
    if (group.controls["newPW"].value !== confirm.value)
      confirm.setErrors({ newMatchesConfirm: true });
    return null;
  }
}
