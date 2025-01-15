import ButtonSubmit from './ButtonSubmit';
import GoogleAutocomplete from './GoogleAutocomplete';
import Email from './Input.Email';
import Number from './Input.Number';
import Password from './Input.Password';
import Text from './Input.Text';
import MaskedInput from './MaskedInput';
import PhoneNumberInput from './PhoneNumberInput';
import Radio from './Radio';
import Select from './Select';
import SelectFile from './SelectFile';
import Textarea from './Textarea';

const Fields = {
   Email,
   Number,
   Password,
   Text,
   Select,
   Textarea,
   ButtonSubmit,
   MaskedInput,
   Radio,
   PhoneNumberInput,
   SelectFile,
   Google: GoogleAutocomplete,
};

export default Fields;
