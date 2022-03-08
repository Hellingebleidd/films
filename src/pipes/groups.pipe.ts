import { Pipe, PipeTransform } from '@angular/core';
import { Group } from 'src/entities/group';

@Pipe({
  name: 'groups'
})
export class GroupsPipe implements PipeTransform {

  transform(groups: Group[], option?: string): string {
    if (option === 'permissions') {
      return groups.flatMap(g => g.permissions).
      reduce((acc:string[], perm:string) => acc.includes(perm) ? acc: [...acc, perm], []).
      join(', ')
    } else {
      return groups.map(g => g.name).join(', ');
    }
  }

}
