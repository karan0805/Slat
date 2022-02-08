import React from 'react';
import { Button } from '@mantine/core';

export default function Invite() {
  function copy() {
    /* Get the text field */
    var copyText = document.getElementById('InviteUrl');

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);

    /* Alert the copied text */
    alert('Copied the text: ' + copyText.value);
  }
  return (
    <div>
      <input value="www.google.com/" id="InviteUrl" readOnly />
      <Button color="green" onClick={copy} compact>
        copy
      </Button>
    </div>
  );
}
