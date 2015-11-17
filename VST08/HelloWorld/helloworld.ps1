param (
    [string]$msg
)

Import-Module $PSScriptRoot\WriteAscii\Write-Ascii.psd1

# Import the Task.Common dll that has all the cmdlets we need for Build
import-module "Microsoft.TeamFoundation.DistributedTask.Task.Common"

Write-Ascii $Msg



