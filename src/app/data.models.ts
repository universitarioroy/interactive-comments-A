import {currentuser} from './currentuser.models';
import {comment} from './comment.models';

export interface data{
  currentUser:currentuser,
  comments:comment[],
}
