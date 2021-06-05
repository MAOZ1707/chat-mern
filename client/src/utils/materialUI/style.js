import { makeStyles, Tooltip, withStyles } from '@material-ui/core'

export const LightTooltip = withStyles((theme) => ({
	tooltip: {
		backgroundColor: theme.palette.common.black,
		color: 'rgba(255,255,255)',
		boxShadow: theme.shadows[1],
		fontSize: 15,
	},
}))(Tooltip)

export const useStyles = makeStyles((theme) => ({
	small: {
		width: theme.spacing(3),
		height: theme.spacing(3),
	},
	large: {
		width: theme.spacing(6),
		height: theme.spacing(6),
	},
}))
