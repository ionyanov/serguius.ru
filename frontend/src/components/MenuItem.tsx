/** @format */

'use client';
import { useRef, useState, FC } from 'react';
import { Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import { ICategory } from '@/types/type';

interface MenuBarItemProps {
	items: ICategory[];
	depthLevel: number;
	curItem: ICategory;
}

export const MenuBarItem: FC<MenuBarItemProps> = (props) => {
	const [open, setOpen] = useState(false);
	const anchorRef = useRef<HTMLButtonElement>(null);

	const onMouseEnter = () => setOpen(true);
	const onMouseLeave = () => setOpen(false);

	const childs = props.items.filter((cat) => cat.parCategoryId == props.curItem.id);
	return (
		<MenuItem onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
			{childs.length > 0 ? (
				<>
					<Button
						ref={anchorRef}
						id={props.curItem.name}
						variant={props.depthLevel == 0 ? 'text' : 'contained'}
						aria-controls={open ? 'composition-menu' : undefined}
						aria-expanded={open ? 'true' : undefined}
						aria-haspopup="true"
						onClick={() => setOpen((prevOpen) => !prevOpen)}>
						{props.curItem.name}
					</Button>
					<Popper
						open={open}
						anchorEl={anchorRef.current}
						role={undefined}
						placement="auto"
						transition
						sx={{ zIndex: 100 }}
						disablePortal>
						{({ TransitionProps }) => (
							<Grow {...TransitionProps}>
								<Paper>
									<ClickAwayListener onClickAway={(event) => setOpen((prevOpen) => !prevOpen)}>
										<MenuList
											autoFocusItem={open}
											id="composition-menu"
											aria-labelledby="composition-button">
											{childs.map((child) => {
												return (
													<MenuBarItem
														items={props.items}
														depthLevel={props.depthLevel + 1}
														key={child.id}
														curItem={child}
													/>
												);
											})}
										</MenuList>
									</ClickAwayListener>
								</Paper>
							</Grow>
						)}
					</Popper>
				</>
			) : (
				<Button href={`/${props.curItem.link}`} color={props.depthLevel == 0 ? 'primary' : 'secondary'}>
					{props.curItem.name}
				</Button>
			)}
		</MenuItem>
	);
};
